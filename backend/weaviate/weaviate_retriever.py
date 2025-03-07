import weaviate
from weaviate.connect import ConnectionParams

# Define connection parameters
connection_params = ConnectionParams.from_url(
    "http://localhost:8080",  
    grpc_port=50051
)

# Connect to Weaviate instance using v4 Client
client = weaviate.WeaviateClient(connection_params)

# Ensure connection is established
if not client.is_ready():
    print("⚠️ Weaviate client was closed. Reconnecting...")
    client.connect()

if client.is_ready():
    print("✅ Weaviate is running!")
else:
    print("❌ Weaviate is still not available. Check Docker.")

def search_weaviate(query, top_k=3):
    if not client.is_ready():
        print("⚠️ Reconnecting to Weaviate...")
        client.connect()

    try:
        ayurvedic_collection = client.collections.get("AyurvedicText")

        response = ayurvedic_collection.query.near_text(
            query=query,  
            limit=top_k  
        )

        return response.objects if response.objects else []
    
    except Exception as e:
        print(f"❌ Error in Weaviate query: {str(e)}")
        return []