import psycopg2
import random
from datetime import datetime

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="depdagri",
    user="abi",
    password="abi",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()

# List of years to update
years = list(range(2014, 2025))

# List of vehicle types
vehicle_types = ['A', 'B', 'C', 'D', 'E', 'F']

# Generate and update randomized data for the new columns
for year in years:
    data = {
        'year': year,
        'tidak_bayar_5_thn_tipe_A': random.randint(0, 1000),
        'tidak_bayar_5_thn_tipe_B': random.randint(0, 1000),
        'tidak_bayar_5_thn_tipe_C': random.randint(0, 1000),
        'tidak_bayar_5_thn_tipe_D': random.randint(0, 1000),
        'tidak_bayar_5_thn_tipe_E': random.randint(0, 1000),
        'tidak_bayar_5_thn_tipe_F': random.randint(0, 1000),
        'tidak_bayar_7_thn_tipe_A': random.randint(0, 1000),
        'tidak_bayar_7_thn_tipe_B': random.randint(0, 1000),
        'tidak_bayar_7_thn_tipe_C': random.randint(0, 1000),
        'tidak_bayar_7_thn_tipe_D': random.randint(0, 1000),
        'tidak_bayar_7_thn_tipe_E': random.randint(0, 1000),
        'tidak_bayar_7_thn_tipe_F': random.randint(0, 1000),
        'tidak_bayar_5_thn_tipe_A_rupiah': random.randint(0, 1000000000),
        'tidak_bayar_5_thn_tipe_B_rupiah': random.randint(0, 1000000000),
        'tidak_bayar_5_thn_tipe_C_rupiah': random.randint(0, 1000000000),
        'tidak_bayar_5_thn_tipe_D_rupiah': random.randint(0, 1000000000),
        'tidak_bayar_5_thn_tipe_E_rupiah': random.randint(0, 1000000000),
        'tidak_bayar_5_thn_tipe_F_rupiah': random.randint(0, 1000000000),
        'tidak_bayar_7_thn_tipe_A_rupiah': random.randint(0, 1000000000),
        'tidak_bayar_7_thn_tipe_B_rupiah': random.randint(0, 1000000000),
        'tidak_bayar_7_thn_tipe_C_rupiah': random.randint(0, 1000000000),
        'tidak_bayar_7_thn_tipe_D_rupiah': random.randint(0, 1000000000),
        'tidak_bayar_7_thn_tipe_E_rupiah': random.randint(0, 1000000000),
        'tidak_bayar_7_thn_tipe_F_rupiah': random.randint(0, 1000000000),
        'baru_tipe_A': random.randint(0, 1000),
        'baru_tipe_B': random.randint(0, 1000),
        'baru_tipe_C': random.randint(0, 1000),
        'baru_tipe_D': random.randint(0, 1000),
        'baru_tipe_E': random.randint(0, 1000),
        'baru_tipe_F': random.randint(0, 1000)
    }
    
    cursor.execute("""
        UPDATE pkbrekap
        SET
            tidak_bayar_5_thn_tipe_A = %s,
            tidak_bayar_5_thn_tipe_B = %s,
            tidak_bayar_5_thn_tipe_C = %s,
            tidak_bayar_5_thn_tipe_D = %s,
            tidak_bayar_5_thn_tipe_E = %s,
            tidak_bayar_5_thn_tipe_F = %s,
            tidak_bayar_7_thn_tipe_A = %s,
            tidak_bayar_7_thn_tipe_B = %s,
            tidak_bayar_7_thn_tipe_C = %s,
            tidak_bayar_7_thn_tipe_D = %s,
            tidak_bayar_7_thn_tipe_E = %s,
            tidak_bayar_7_thn_tipe_F = %s,
            tidak_bayar_5_thn_tipe_A_rupiah = %s,
            tidak_bayar_5_thn_tipe_B_rupiah = %s,
            tidak_bayar_5_thn_tipe_C_rupiah = %s,
            tidak_bayar_5_thn_tipe_D_rupiah = %s,
            tidak_bayar_5_thn_tipe_E_rupiah = %s,
            tidak_bayar_5_thn_tipe_F_rupiah = %s,
            tidak_bayar_7_thn_tipe_A_rupiah = %s,
            tidak_bayar_7_thn_tipe_B_rupiah = %s,
            tidak_bayar_7_thn_tipe_C_rupiah = %s,
            tidak_bayar_7_thn_tipe_D_rupiah = %s,
            tidak_bayar_7_thn_tipe_E_rupiah = %s,
            tidak_bayar_7_thn_tipe_F_rupiah = %s
        WHERE year = %s
    """, (
        data['tidak_bayar_5_thn_tipe_A'], data['tidak_bayar_5_thn_tipe_B'], data['tidak_bayar_5_thn_tipe_C'], data['tidak_bayar_5_thn_tipe_D'], data['tidak_bayar_5_thn_tipe_E'], data['tidak_bayar_5_thn_tipe_F'],
        data['tidak_bayar_7_thn_tipe_A'], data['tidak_bayar_7_thn_tipe_B'], data['tidak_bayar_7_thn_tipe_C'], data['tidak_bayar_7_thn_tipe_D'], data['tidak_bayar_7_thn_tipe_E'], data['tidak_bayar_7_thn_tipe_F'],
        data['tidak_bayar_5_thn_tipe_A_rupiah'], data['tidak_bayar_5_thn_tipe_B_rupiah'], data['tidak_bayar_5_thn_tipe_C_rupiah'], data['tidak_bayar_5_thn_tipe_D_rupiah'], data['tidak_bayar_5_thn_tipe_E_rupiah'], data['tidak_bayar_5_thn_tipe_F_rupiah'],
        data['tidak_bayar_7_thn_tipe_A_rupiah'], data['tidak_bayar_7_thn_tipe_B_rupiah'], data['tidak_bayar_7_thn_tipe_C_rupiah'], data['tidak_bayar_7_thn_tipe_D_rupiah'], data['tidak_bayar_7_thn_tipe_E_rupiah'], data['tidak_bayar_7_thn_tipe_F_rupiah'],
        data['year']
    ))

# Commit the changes and close the connection
conn.commit()
cursor.close()
conn.close()
