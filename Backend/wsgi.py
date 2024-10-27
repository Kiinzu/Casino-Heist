from app import app, db

with app.app_context():
    db.create_all()
    print("Database tables created.")

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=7555)
