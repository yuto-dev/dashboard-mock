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

# SQL statement to create the table if it doesn't exist, now including provinsiID
create_table_query = """
CREATE TABLE IF NOT EXISTS kabupatenData (
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

# Insert 23 rows with random values, including provinsiID set to 1
for i in range(23):
    # Generate random values for each column
    targetpkb = random.randint(50000000, 100000000)
    realisasipkb = random.randint(50000000, 100000000)
    targetbbnkb = random.randint(50000000, 100000000)
    realisasibbnkb = random.randint(50000000, 100000000)
    
    # SQL statement to insert a row, now including provinsiID
    insert_query = """
    INSERT INTO kabupatenData (provinsiID, targetpkb, realisasipkb, targetbbnkb, realisasibbnkb)
    VALUES (%s, %s, %s, %s, %s);
    """
    
    # Execute the insert query with the generated random values, including provinsiID set to 1
    cur.execute(insert_query, (1, targetpkb, realisasipkb, targetbbnkb, realisasibbnkb))

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print("Data inserted successfully.")