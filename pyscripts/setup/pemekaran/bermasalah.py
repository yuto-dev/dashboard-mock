import psycopg2

# Database connection parameters
db_params = {
    'dbname': 'depdagri',
    'user': 'abi',
    'password': 'abi',
    'host': 'localhost',
    'port': '5432'
}

# Data to be inserted
data = [
    (0, 0, 0, 0, 0, 0, 3063, 3090),
    (5, 5, 10, 1714, 0, 64, 4881, 5065),
    (10, 73492, 6259, 18784, 0, 4260, 10223, 11594),
    (100, 73497, 6269, 20498, 0, 4324, 18167, 19749)
]

# SQL command to create the table
create_table_sql = """
CREATE TABLE IF NOT EXISTS bermasalah (
    periode NUMERIC,
    plat_bm NUMERIC,
    plat_bp_seri_x NUMERIC,
    tipe_kosong NUMERIC,
    tipe_ada_golkend_kosong NUMERIC,
    no_plat_ganda NUMERIC,
    no_chasis_ganda NUMERIC,
    no_mesin_ganda NUMERIC
);
"""

# SQL command to insert data
insert_data_sql = """
INSERT INTO bermasalah (
    periode, plat_bm, plat_bp_seri_x, tipe_kosong, tipe_ada_golkend_kosong, no_plat_ganda, no_chasis_ganda, no_mesin_ganda
) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
"""

try:
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(**db_params)
    cursor = conn.cursor()

    # Create the table
    cursor.execute(create_table_sql)

    # Insert the data
    cursor.executemany(insert_data_sql, data)

    # Commit the transaction
    conn.commit()

    print("Table created and data inserted successfully")

except Exception as e:
    print(f"An error occurred: {e}")

finally:
    # Close the cursor and connection
    if cursor:
        cursor.close()
    if conn:
        conn.close()
