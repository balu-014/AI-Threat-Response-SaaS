import joblib

model = joblib.load("threat_model.pkl")

def lambda_handler(event, context):

    features = event["features"]

    prediction = int(
        model.predict([features])[0]
    )

    return {
        "prediction": prediction
    }