import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModel

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

# Example text for bail case
text = """
John Doe is charged under Sections 420 and 467 of the Indian Penal Code for forgery and cheating. He has been in custody for 8 months. The charges include non-bailable offenses related to economic fraud. Legal aid is seeking to assess his eligibility for bail.
"""

# Tokenize and encode the text
encoded_input = tokenizer(text, return_tensors="pt")
with torch.no_grad():
    output = model(**encoded_input)
    last_hidden_state = output.last_hidden_state

# Assuming the last hidden state of the [CLS] token represents the sentence embedding
cls_embedding = last_hidden_state[:, 0, :]

# Initialize a classifier
classifier = BailClassifier(input_dim=cls_embedding.size(-1), hidden_dim=128, output_dim=2)

# Predict bail eligibility
predictions = classifier(cls_embedding)
print(predictions)  # Example output: tensor([[0.3, 0.7]]) meaning 70% probability of being granted bail