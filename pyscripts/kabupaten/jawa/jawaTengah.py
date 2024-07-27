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
    "Kabupaten Banjarnegara", "Kabupaten Banyumas", "Kabupaten Batang", "Kabupaten Blora",
    "Kabupaten Boyolali", "Kabupaten Brebes", "Kabupaten Cilacap", "Kabupaten Demak",
    "Kabupaten Grobogan", "Kabupaten Jepara", "Kabupaten Karanganyar", "Kabupaten Kebumen",
    "Kabupaten Kendal", "Kabupaten Klaten", "Kabupaten Kudus", "Kabupaten Magelang",
    "Kabupaten Pati", "Kabupaten Pekalongan", "Kabupaten Pemalang", "Kabupaten Purbalingga",
    "Kabupaten Purworejo", "Kabupaten Rembang", "Kabupaten Semarang", "Kabupaten Sragen",
    "Kabupaten Sukoharjo", "Kabupaten Tegal", "Kabupaten Temanggung", "Kabupaten Wonogiri",
    "Kabupaten Wonosobo", "Kota Magelang", "Kota Pekalongan", "Kota Salatiga",
    "Kota Semarang", "Kota Surakarta", "Kota Tegal"
]

# SQL statement to insert a row
insert_query = """
INSERT INTO kabupatenMasterDetail (provinsiID, kabupatenkota)
VALUES (%s, %s);
"""

# Execute the insert query for each kabupatenkota
for kabupaten in kabupatenkota_values:
    cur.execute(insert_query, (14, kabupaten))

print(len(kabupatenkota_values), "rows inserted.")

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print("Data inserted successfully.")