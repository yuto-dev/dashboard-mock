import psycopg2

# Reuse the database connection parameters
db_params = {
    'dbname': 'depdagri',
    'user': 'abi',
    'password': 'abi',
    'host': 'localhost',
    'port': '5432'
}

# Connect to your database
conn = psycopg2.connect(**db_params)

# Create a cursor object
cur = conn.cursor()

# SQL statement to create the kabupatenMasterDetail table
create_table_query = """
CREATE TABLE IF NOT EXISTS kabupatenMasterDetail (
    kabupatenID SERIAL PRIMARY KEY,
    provinsiID NUMERIC,
    kabupatenkota VARCHAR(255)
);
"""

# Execute the create table query
cur.execute(create_table_query)

# List of kabupatenkota values to insert
kabupatenkota_values = [
    "Kabupaten Alor", "Kabupaten Belu", "Kabupaten Ende", "Kabupaten Flores Timur",
    "Kabupaten Kupang", "Kabupaten Lembata", "Kabupaten Malaka", "Kabupaten Manggarai",
    "Kabupaten Manggarai Barat", "Kabupaten Manggarai Timur", "Kabupaten Nagekeo", "Kabupaten Ngada",
    "Kabupaten Rote Ndao", "Kabupaten Sabu Raijua", "Kabupaten Sikka", "Kabupaten Sumba Barat",
    "Kabupaten Sumba Barat Daya", "Kabupaten Sumba Tengah", "Kabupaten Sumba Timur", "Kabupaten Timor Tengah Selatan",
    "Kabupaten Timor Tengah Utara", "Kota Kupang"
]

# SQL statement to insert a row
insert_query = """
INSERT INTO kabupatenMasterDetail (provinsiID, kabupatenkota)
VALUES (%s, %s);
"""

# Execute the insert query for each kabupatenkota
for kabupaten in kabupatenkota_values:
    cur.execute(insert_query, (30, kabupaten))

print(len(kabupatenkota_values), "rows inserted.")

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print("Data inserted successfully.")