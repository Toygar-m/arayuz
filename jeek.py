from flask import Flask, send_file

app = Flask(__name__)

@app.route('/')
def hello_world():
    return send_file("jeek.html", as_attachment=False)

@app.route('/<file>')
def servefile(file):
    return send_file(file, as_attachment=False)

if __name__ == '__main__':
    app.run(
        host="192.168.31.129",
        port=5500,
        debug=True)
