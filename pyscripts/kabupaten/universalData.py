import psycopg2
import random

# Database connection parameters - update these with your details
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

# SQL statement to create the table if it doesn't exist
create_table_query = """
CREATE TABLE IF NOT EXISTS kabupatendata (
    kabupatenID SERIAL PRIMARY KEY,
    provinsiID NUMERIC,
    targetpkb NUMERIC,
    realisasipkb NUMERIC,
    targetbbnkb NUMERIC,
    realisasibbnkb NUMERIC
);
"""

# Execute the create table query
cur.execute(create_table_query)

# Fetch the count of kabupatenkota for each provinsi in ascending order of provinsiid
fetch_kabupaten_counts_query = """
SELECT provinsiid, COUNT(*) as kabupaten_count
FROM kabupatenmasterdetail
GROUP BY provinsiid
ORDER BY provinsiid ASC;
"""

cur.execute(fetch_kabupaten_counts_query)
provinsi_kabupaten_counts = cur.fetchall()

# Iterate over each provinsi and insert randomized data for each kabupatenkota
for provinsiid, kabupaten_count in provinsi_kabupaten_counts:
    for _ in range(kabupaten_count):
        # Generate random values for each column
        targetpkb = random.randint(50000000, 100000000)
        realisasipkb = random.randint(50000000, 100000000)
        targetbbnkb = random.randint(50000000, 100000000)
        realisasibbnkb = random.randint(50000000, 100000000)

        # SQL statement to insert a row
        insert_query = """
        INSERT INTO kabupatendata (provinsiID, targetpkb, realisasipkb, targetbbnkb, realisasibbnkb)
        VALUES (%s, %s, %s, %s, %s);
        """

        # Execute the insert query with the generated random values
        cur.execute(insert_query, (provinsiid, targetpkb, realisasipkb, targetbbnkb, realisasibbnkb))

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print("Data inserted successfully.")
