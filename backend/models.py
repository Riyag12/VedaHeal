# from sqlalchemy import Column, Integer, String, ForeignKey, Table
# from sqlalchemy.orm import relationship
# from database import Base, engine

# # ✅ Many-to-Many Mapping Table for Disease ↔ Drug
# disease_drug = Table(
#     "disease_drug",
#     Base.metadata,
#     Column("disease_id", Integer, ForeignKey("diseases.id")),
#     Column("drug_id", Integer, ForeignKey("drugs.id"))
# )

# class Disease(Base):
#     __tablename__ = "diseases"
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, unique=True, index=True)
#     sanskrit_name = Column(String, nullable=True)
#     #description = Column(String, nullable=True)
#     #drugs = relationship("Drug", secondary=disease_drug, back_populates="diseases")


# class Drug(Base):
#     __tablename__ = "drugs"
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, unique=True, index=True)
#     scientific_name = Column(String, nullable=True)
#     #diseases = relationship("Disease", secondary=disease_drug, back_populates="drugs")
#     #formulations = relationship("Formulation", back_populates="drug")

# class Formulation(Base):
#     __tablename__ = "formulations"
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, unique=True, index=True)
#     ingredients = Column(String, nullable=True)
#     preparation_method = Column(String, nullable=True)
#     dosage = Column(String, nullable=True)
#     #drug_id = Column(Integer, ForeignKey("drugs.id"))  # ✅ Link Formulation to Drug
#     #drug = relationship("Drug", back_populates="formulations")
