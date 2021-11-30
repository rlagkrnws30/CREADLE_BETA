from flask import Flask, render_template, jsonify, request, url_for, redirect, session, abort
from pymongo import MongoClient

app = Flask(__name__)
app.secret_key = 'titan'

client = MongoClient('localhost', 27017)
db = client.user

test = list(db.userInform.find({}, {'id': False}))
# x = 'rlagrkwns30@naver.com'
# if x in test:
#     print(1)
# else :
#     print(2)
for a in test:
    x = 'rlagrkwns30@naver.com'
    if x in a['이메일']:
        print(1)
        break
    else:
        print(2)

# print(test[0]['이메일'])
