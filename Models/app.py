from flask import Flask, request, jsonify
import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModel
from flask_cors import CORS 

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load InLegalBERT model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("law-ai/InLegalBERT")
model = AutoModel.from_pretrained("law-ai/InLegalBERT")

# Classifier for bail eligibility
class BailClassifier(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(BailClassifier, self).__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_dim, output_dim)
        self.softmax = nn.Softmax(dim=1)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return self.softmax(x)

# Initialize the classifier
classifier = BailClassifier(input_dim=768, hidden_dim=128, output_dim=2)  # Assuming 768 for InLegalBERT

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data['text']

    # Tokenize and encode the text
    encoded_input = tokenizer(text, return_tensors="pt")
    with torch.no_grad():
        output = model(**encoded_input)
        last_hidden_state = output.last_hidden_state

    # Assuming the last hidden state of the [CLS] token represents the sentence embedding
    cls_embedding = last_hidden_state[:, 0, :]

    # Predict bail eligibility
    predictions = classifier(cls_embedding)
    predicted_probs = predictions.squeeze().tolist()

    # Return the prediction results as JSON
    return jsonify({'eligibility_prob': predicted_probs})

if __name__ == '__main__':
    app.run(debug=True)