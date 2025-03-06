import weaviate
from weaviate.connect import ConnectionParams

# Define connection parameters
connection_params = ConnectionParams.from_url(
    "http://localhost:8080",  # HTTP URL
    grpc_port=50051           # gRPC Port (default: 50051)
)

# Connect to Weaviate instance using v4 Client
client = weaviate.WeaviateClient(connection_params)

# Ensure connection is established
if not client.is_ready():
    print("❌ Weaviate is not available. Trying to reconnect...")
    client.connect()  # Explicitly reconnect

if client.is_ready():
    print("✅ Weaviate is running!")
else:
    print("❌ Weaviate is still not available. Check Docker.")

client.close()  # Close connection