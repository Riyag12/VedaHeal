from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship

# Create a base class
Base = declarative_base()

# ✅ Many-to-Many Mapping Table for Disease ↔ Drug
disease_drug = Table(
    "disease_drug",
    Base.metadata,
    Column("disease_id", Integer, ForeignKey("diseases.id")),
    Column("drug_id", Integer, ForeignKey("drugs.id"))
)

class Disease(Base):
    __tablename__ = "diseases"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    drugs = relationship("Drug", secondary=disease_drug, back_populates="diseases")
    formulations = relationship("Formulation", back_populates="disease")

class Drug(Base):
    __tablename__ = "drugs"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    scientific_name = Column(String, nullable=True)
    diseases = relationship("Disease", secondary=disease_drug, back_populates="drugs")
    formulations = relationship("Formulation", back_populates="drug")

class Formulation(Base):
    __tablename__ = "formulations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    dosage = Column(String, nullable=True)
    drug_id = Column(Integer, ForeignKey("drugs.id"))
    drug = relationship("Drug", back_populates="formulations")
    disease_id = Column(Integer, ForeignKey("diseases.id"))
    disease = relationship("Disease", back_populates="formulations")


# Database connection string
DATABASE_URL = "postgresql://postgres:riyagarg@localhost:5432/ayurvedicdb"

# Create a database engine
engine = create_engine(DATABASE_URL)

# Create the table in the database
Base.metadata.create_all(engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

print("Table created successfully.")