import psycopg2
import random

# Database connection parameters
db_params = {
    'dbname': 'depdagri',
    'user': 'abi',
    'password': 'abi',
    'host': 'localhost',
    'port': '5432'
}

# Connect to the PostgreSQL database
conn = psycopg2.connect(**db_params)
cur = conn.cursor()

# Define vehicle types and their corresponding columns
vehicle_types = ['A', 'B', 'C', 'D', 'E', 'F']
columns_to_add = [f"membayar_pajak_thn_berjalan_tipe_{vt.lower()}" for vt in vehicle_types]

# Add new columns to the table
for column in columns_to_add:
    cur.execute(f"ALTER TABLE pkbrekap ADD COLUMN {column} INTEGER;")

# Generate random data for the new columns and update the table
for column in columns_to_add:
    cur.execute(f"UPDATE pkbrekap SET {column} = %s;", (random.randint(100, 10000),))

# Commit changes and close the connection
conn.commit()
cur.close()
conn.close()

print("Columns added and data generated successfully.")
