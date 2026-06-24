def analyze(prediction):

    if prediction == 0:
        return "Low"

    elif prediction <= 5:
        return "Medium"

    elif prediction <= 10:
        return "High"

    return "Critical"