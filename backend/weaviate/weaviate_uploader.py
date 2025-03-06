import weaviate
from weaviate.connect import ConnectionParams  # ✅ Import ConnectionParams from the correct module
from sentence_transformers import SentenceTransformer
from pdf_reader import extract_text_from_pdf
from text_chunker import chunk_text

# ✅ Define both HTTP and gRPC ports
WEAVIATE_URL = "http://localhost:8080"
GRPC_PORT = 50051

connection_params = ConnectionParams.from_url(WEAVIATE_URL, grpc_port=GRPC_PORT)
client = weaviate.WeaviateClient(connection_params)  

if not client.is_live():
    client.connect()
    
print("✅ Weaviate is running!")    

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

def store_text_in_weaviate(book_title, pdf_path):
    pages = extract_text_from_pdf(pdf_path)

    for page in pages:
        chunks = chunk_text(page["text"])
        
        for chunk in chunks:
            vector = embedding_model.encode(chunk).tolist()
            
            data_object = {
                "content": chunk,
                "source": book_title,
                "chapter": "Unknown",
                "pageNumber": page["page"]
            }
            
            client.collections.get("AyurvedicText").data.insert( 
                properties=data_object, vector=vector
            )
            print(f"✅ Inserted")

if __name__ == "__main__":
    store_text_in_weaviate("Ayurveda", "C:/Users/admin/OneDrive/Desktop/VedaHeal/VedaHeal/backend/data/books/ayurveda.pdf")
    client.close() 
