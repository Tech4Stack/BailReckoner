from transformers import AutoTokenizer, AutoModel

# Load InLegalBERT model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("law-ai/InLegalBERT")
model = AutoModel.from_pretrained("law-ai/InLegalBERT")

# Real-life legal text related to the bail scenario
text = """
John Doe is charged under Sections 420 and 467 of the Indian Penal Code for forgery and cheating. He has been in custody for 8 months. The charges include non-bailable offenses related to economic fraud. Legal aid is seeking to assess his eligibility for bail.
"""

# Encode the input text
encoded_input = tokenizer(text, return_tensors="pt")

# Get model output
output = model(**encoded_input)
last_hidden_state = output.last_hidden_state

# Print the shape of the output embeddings
print(last_hidden_state.shape)

# Further processing can involve passing this output to a classifier or using it for legal reasoning tasks.