import pandas as pd
import psycopg2
from psycopg2 import sql, extras

# Load the CSV file
csv_file_path = 'daerah_master.csv'
df = pd.read_csv(csv_file_path, delimiter=';', dtype={'kode_prop': str, 'kode_kab': str, 'kode_ddn': str, 'kode_ddn_2': str})

# Select only the specified columns
df = df[['id_daerah', 'kode_prop', 'kode_kab', 'nama_daerah', 'kode_ddn', 'kode_ddn_2', 'is_pusat', 'is_prop', 'id_prop']]

# Convert integer values to boolean for specific columns
boolean_columns = ['is_pusat', 'is_prop']
for col in boolean_columns:
    df[col] = df[col].astype(bool)

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

# Create the table if it doesn't exist
create_table_query = """
CREATE TABLE IF NOT EXISTS daerah_master (
    id_daerah INTEGER,
    kode_prop VARCHAR(10),
    kode_kab VARCHAR(10),
    nama_daerah VARCHAR(255),
    kode_ddn VARCHAR(10),
    kode_ddn_2 VARCHAR(10),
    is_pusat BOOLEAN,
    is_prop BOOLEAN,
    id_prop INTEGER
);
"""
cur.execute(create_table_query)
conn.commit()

# Insert data into the table
insert_query = """
INSERT INTO daerah_master (
    id_daerah, kode_prop, kode_kab, nama_daerah, kode_ddn, kode_ddn_2, is_pusat, is_prop, id_prop
) VALUES %s
"""

# Convert dataframe to list of tuples
data_tuples = [tuple(x) for x in df.to_numpy()]

# Execute the insert query
extras.execute_values(cur, insert_query, data_tuples)
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()
