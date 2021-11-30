import pathlib

#import google as google
from flask import Flask, render_template, jsonify, request, url_for, redirect, session, abort
from pip._vendor import cachecontrol
from pymongo import MongoClient
from authlib.integrations.flask_client import OAuth
#from google_auth_oauthlib.flow import Flow
import os
import time
import ssl

app = Flask(__name__)
app.secret_key = 'titan'

# client = MongoClient('mongodb://creadle:hjjw@15.164.220.134', 27017)
client = MongoClient('localhost', 27017)

db = client.user

# oauth config
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id='265594304524-f5s0ujtcigvq58p64l6srakfdrq71j29.apps.googleusercontent.com',
    client_secret='ySAHJN_G-CHMeqVzYKjco_R7',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
    jwks_uri="https://www.googleapis.com/oauth2/v3/certs",
    client_kwargs={'scope': 'openid profile email'},
)

login_time = time.time()


def login_is_required(function):
    def wrapper(*args, **kwargs):
        print(session)
        if "email" not in session:
            print(1)
            return abort(401)
        else:
            return function()
    return wrapper


@app.route('/')
def home():
    picture = dict(session).get('picture', None)
    email = dict(session).get('email', None)
    name = dict(session).get('name', None)
    if "email" in session and "email" != None:
        return render_template('index.html', user_picture=picture, user_name=name, user_email=email)
    return render_template('index.html', login="로그인", sign_up="회원가입")


@app.route('/', methods=['POST'])
def log_out():
    log_out = request.form['logout']
    signup = request.form['signup']
    if log_out == '0':
        return render_template('index.html')
    else:
        session.pop('email', None)
        return render_template('index.html', login="로그인", sign_up="회원가입")

@app.route('/', methods=['POST'])
def refresh():
    refresh_token = request.form['refresh']
    return render_template('index.html')

@app.route('/faq')
def faq():
    picture = dict(session).get('picture', None)
    email = dict(session).get('email', None)
    name = dict(session).get('name', None)
    if "email" in session and "email" != None:
        return render_template('faq.html', user_picture=picture, user_name=name, user_email=email)
    return render_template('faq.html', login="로그인")


@app.route('/faq', methods=['POST'])
def faq_log_out():
    session.pop('email',None)
    return render_template('faq.html', login="로그인")


@app.route('/login')
def login():
    if "email" in session:
        return redirect('/')
    return render_template('login.html', login="로그인", sign_up="회원가입")


@app.route('/login/google')
def google_login():
    google = oauth.create_client('google')
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)


@app.route('/authorize')
def authorize():
    google = oauth.create_client('google')
    token = google.authorize_access_token()
    userinfo = oauth.google.parse_id_token(token)
    resp = google.get('userinfo')
    resp.raise_for_status()
    user_info = resp.json()
    members = list(db.member.find({}, {'id': False}))
    print(userinfo), print(user_info)
    print(members)
    # 회원가입 여부 판단
    # member db의 이메일들과 로그인 이메일과 비교 검증
    for member in members:
        print(1)
        if user_info['email'] in member['이메일']:
            print(2)
            session['email'] = user_info['email']
            session['picture'] = user_info['picture']
            session['name'] = user_info['name']
            return redirect('/')
        else:
            continue
    print(3)
    login_time_tr = time.ctime(login_time)
    user_inform = {'로그인 시간': login_time_tr, '이메일': user_info['email'], '이름': user_info['name'],
                   '지역': user_info['locale']}
    db.member.insert_one(user_inform)
    # session['email'] = user_info['email']
    # session['picture'] = user_info['picture']
    # session['name'] = user_info['name']
    return redirect('/signup/google')

    # session['email'] = user_info['email']
    # session['picture'] = user_info['picture']
    # session['name'] = user_info['name']
    # login_time_tr = time.ctime(login_time)
    # user_inform = {'로그인 시간': login_time_tr, '이메일': user_info['email'], '이름': user_info['name'],
    #                '지역': user_info['locale']}
    # db.member.insert_one(user_inform)
    # # 세션
    # return redirect('/')


# client에서 ajax콜을 통해 동일 router에서 session pop이 되게 한다.
@app.route('/logout/google')
def google_logout():
    session.pop('user', None)
    # return redirect('/')
    return render_template('index.html', login="로그인")


@app.route('/signup')
def sign_up():
    method = request.args.get('method')
    email = dict(session).get('email', None)
    if "email" in session:
        return redirect('/')
    elif method == "google":
        return render_template("signUpGoogle.html", login="로그인", sign_up="회원가입", email=email)
    return render_template('signUp.html', login="로그인", sign_up="회원가입")


# method google(signup.html) 버튼 클릭 후 authorization으로 연결해서 로그인 후
# 이용약관 동의함 페이지(signUpgoogle.html) 연결

@app.route('/signup/google')
def sign_up_google():
    return render_template('signUpGoogle.html', login='로그인')


@app.route('/signup/google', methods=['POST'])
def agree():
    signup = request.form['signup']
    print(signup)
    if signup == '1':
        print('signup')
        picture = dict(session).get('picture', None)
        email = dict(session).get('email', None)
        name = dict(session).get('name', None)
        print(f'Hello {email}')
        return render_template('index.html', user_picture=picture, user_name=name, user_email=email)
    return render_template('signUpGoogle.html')


@app.route('/term')
def term():
    picture = dict(session).get('picture', None)
    email = dict(session).get('email', None)
    name = dict(session).get('name', None)
    if "email" in session and "email" != None:
        return render_template('term.html', user_picture=picture, user_name=name, user_email=email)
    return render_template('term.html', login='로그인')


@app.route('/privacy')
def privacy():
    return render_template('privacy.html')


@app.route('/protected')
@login_is_required
def protected_area():
    return "Protected area <button>logout</button>"


if __name__ == '__main__':
    # ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    # ssl_context.load_cert_chain(certfile=)
    app.run('0.0.0.0', port=3000, debug=True)
