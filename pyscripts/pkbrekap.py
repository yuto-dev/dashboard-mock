import psycopg2
import random
from datetime import datetime

# Database connection
conn = psycopg2.connect(
    dbname="depdagri",
    user="abi",
    password="abi",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()

# Create the pkbrekap table
create_table_query = """
CREATE TABLE IF NOT EXISTS pkbrekap (
    year INTEGER PRIMARY KEY,
    total_kendaraan INTEGER,
    total_tidak_bayar_5_thn INTEGER,
    total_tidak_bayar_7_thn INTEGER,
    total_bayar_thn_berjalan INTEGER,
    total_kendaraan_baru INTEGER,
    total_tidak_bayar_5_thn_rupiah NUMERIC,
    total_tidak_bayar_7_thn_rupiah NUMERIC,
    total_tidak_bayar_1_thn_rupiah NUMERIC,
    bayar_online INTEGER,
    bayar_offline INTEGER,
    bayar_online_rupiah NUMERIC,
    bayar_offline_rupiah NUMERIC,
    jumlah_tipe_A INTEGER,
    jumlah_tipe_B INTEGER,
    jumlah_tipe_C INTEGER,
    jumlah_tipe_D INTEGER,
    jumlah_tipe_E INTEGER,
    jumlah_tipe_F INTEGER,
    baru_tipe_A INTEGER,
    baru_tipe_B INTEGER,
    baru_tipe_C INTEGER,
    baru_tipe_D INTEGER,
    baru_tipe_E INTEGER,
    baru_tipe_F INTEGER,
    bayar_1_thn_tipe_A INTEGER,
    bayar_1_thn_tipe_B INTEGER,
    bayar_1_thn_tipe_C INTEGER,
    bayar_1_thn_tipe_D INTEGER,
    bayar_1_thn_tipe_E INTEGER,
    bayar_1_thn_tipe_F INTEGER,
    bayar_2_thn_tipe_A INTEGER,
    bayar_2_thn_tipe_B INTEGER,
    bayar_2_thn_tipe_C INTEGER,
    bayar_2_thn_tipe_D INTEGER,
    bayar_2_thn_tipe_E INTEGER,
    bayar_2_thn_tipe_F INTEGER,
    bayar_3_thn_tipe_A INTEGER,
    bayar_3_thn_tipe_B INTEGER,
    bayar_3_thn_tipe_C INTEGER,
    bayar_3_thn_tipe_D INTEGER,
    bayar_3_thn_tipe_E INTEGER,
    bayar_3_thn_tipe_F INTEGER,
    bayar_1_thn_tipe_A_rupiah NUMERIC,
    bayar_1_thn_tipe_B_rupiah NUMERIC,
    bayar_1_thn_tipe_C_rupiah NUMERIC,
    bayar_1_thn_tipe_D_rupiah NUMERIC,
    bayar_1_thn_tipe_E_rupiah NUMERIC,
    bayar_1_thn_tipe_F_rupiah NUMERIC,
    bayar_2_thn_tipe_A_rupiah NUMERIC,
    bayar_2_thn_tipe_B_rupiah NUMERIC,
    bayar_2_thn_tipe_C_rupiah NUMERIC,
    bayar_2_thn_tipe_D_rupiah NUMERIC,
    bayar_2_thn_tipe_E_rupiah NUMERIC,
    bayar_2_thn_tipe_F_rupiah NUMERIC,
    bayar_3_thn_tipe_A_rupiah NUMERIC,
    bayar_3_thn_tipe_B_rupiah NUMERIC,
    bayar_3_thn_tipe_C_rupiah NUMERIC,
    bayar_3_thn_tipe_D_rupiah NUMERIC,
    bayar_3_thn_tipe_E_rupiah NUMERIC,
    bayar_3_thn_tipe_F_rupiah NUMERIC,
    tidak_bayar_1_thn_tipe_A INTEGER,
    tidak_bayar_1_thn_tipe_B INTEGER,
    tidak_bayar_1_thn_tipe_C INTEGER,
    tidak_bayar_1_thn_tipe_D INTEGER,
    tidak_bayar_1_thn_tipe_E INTEGER,
    tidak_bayar_1_thn_tipe_F INTEGER,
    tidak_bayar_2_thn_tipe_A INTEGER,
    tidak_bayar_2_thn_tipe_B INTEGER,
    tidak_bayar_2_thn_tipe_C INTEGER,
    tidak_bayar_2_thn_tipe_D INTEGER,
    tidak_bayar_2_thn_tipe_E INTEGER,
    tidak_bayar_2_thn_tipe_F INTEGER,
    tidak_bayar_3_thn_tipe_A INTEGER,
    tidak_bayar_3_thn_tipe_B INTEGER,
    tidak_bayar_3_thn_tipe_C INTEGER,
    tidak_bayar_3_thn_tipe_D INTEGER,
    tidak_bayar_3_thn_tipe_E INTEGER,
    tidak_bayar_3_thn_tipe_F INTEGER,
    tidak_bayar_1_thn_tipe_A_rupiah NUMERIC,
    tidak_bayar_1_thn_tipe_B_rupiah NUMERIC,
    tidak_bayar_1_thn_tipe_C_rupiah NUMERIC,
    tidak_bayar_1_thn_tipe_D_rupiah NUMERIC,
    tidak_bayar_1_thn_tipe_E_rupiah NUMERIC,
    tidak_bayar_1_thn_tipe_F_rupiah NUMERIC,
    tidak_bayar_2_thn_tipe_A_rupiah NUMERIC,
    tidak_bayar_2_thn_tipe_B_rupiah NUMERIC,
    tidak_bayar_2_thn_tipe_C_rupiah NUMERIC,
    tidak_bayar_2_thn_tipe_D_rupiah NUMERIC,
    tidak_bayar_2_thn_tipe_E_rupiah NUMERIC,
    tidak_bayar_2_thn_tipe_F_rupiah NUMERIC,
    tidak_bayar_3_thn_tipe_A_rupiah NUMERIC,
    tidak_bayar_3_thn_tipe_B_rupiah NUMERIC,
    tidak_bayar_3_thn_tipe_C_rupiah NUMERIC,
    tidak_bayar_3_thn_tipe_D_rupiah NUMERIC,
    tidak_bayar_3_thn_tipe_E_rupiah NUMERIC,
    tidak_bayar_3_thn_tipe_F_rupiah NUMERIC
);
"""
cursor.execute(create_table_query)

# Generate randomized data
years = list(range(2014, 2025))
vehicle_types = ['A', 'B', 'C', 'D', 'E', 'F']
vehicle_weights = [50, 30, 10, 5, 3, 2]  # Weights to ensure more Type A vehicles than others

def generate_random_data():
    data = []
    for year in years:
        yearly_data = {
            'year': year,
            'total_kendaraan': 0,
            'total_tidak_bayar_5_thn': 0,
            'total_tidak_bayar_7_thn': 0,
            'total_bayar_thn_berjalan': 0,
            'total_kendaraan_baru': 0,
            'total_tidak_bayar_5_thn_rupiah': 0,
            'total_tidak_bayar_7_thn_rupiah': 0,
            'total_tidak_bayar_1_thn_rupiah': 0,
            'bayar_online': 0,
            'bayar_offline': 0,
            'bayar_online_rupiah': 0,
            'bayar_offline_rupiah': 0,
        }

        for i, vehicle_type in enumerate(vehicle_types):
            total_vehicles = random.randint(10000, 50000) * vehicle_weights[i]
            new_vehicles = random.randint(1000, 5000) * vehicle_weights[i]
            bayar_1_thn = random.randint(5000, 20000) * vehicle_weights[i]
            bayar_2_thn = random.randint(2000, 15000) * vehicle_weights[i]
            bayar_3_thn = random.randint(1000, 10000) * vehicle_weights[i]
            tidak_bayar_1_thn = total_vehicles - bayar_1_thn
            tidak_bayar_2_thn = total_vehicles - bayar_2_thn
            tidak_bayar_3_thn = total_vehicles - bayar_3_thn

            yearly_data[f'jumlah_tipe_{vehicle_type}'] = total_vehicles
            yearly_data[f'baru_tipe_{vehicle_type}'] = new_vehicles
            yearly_data[f'bayar_1_thn_tipe_{vehicle_type}'] = bayar_1_thn
            yearly_data[f'bayar_2_thn_tipe_{vehicle_type}'] = bayar_2_thn
            yearly_data[f'bayar_3_thn_tipe_{vehicle_type}'] = bayar_3_thn
            yearly_data[f'tidak_bayar_1_thn_tipe_{vehicle_type}'] = tidak_bayar_1_thn
            yearly_data[f'tidak_bayar_2_thn_tipe_{vehicle_type}'] = tidak_bayar_2_thn
            yearly_data[f'tidak_bayar_3_thn_tipe_{vehicle_type}'] = tidak_bayar_3_thn
            yearly_data[f'bayar_1_thn_tipe_{vehicle_type}_rupiah'] = bayar_1_thn * random.randint(100, 500)
            yearly_data[f'bayar_2_thn_tipe_{vehicle_type}_rupiah'] = bayar_2_thn * random.randint(100, 500)
            yearly_data[f'bayar_3_thn_tipe_{vehicle_type}_rupiah'] = bayar_3_thn * random.randint(100, 500)
            yearly_data[f'tidak_bayar_1_thn_tipe_{vehicle_type}_rupiah'] = tidak_bayar_1_thn * random.randint(100, 500)
            yearly_data[f'tidak_bayar_2_thn_tipe_{vehicle_type}_rupiah'] = tidak_bayar_2_thn * random.randint(100, 500)
            yearly_data[f'tidak_bayar_3_thn_tipe_{vehicle_type}_rupiah'] = tidak_bayar_3_thn * random.randint(100, 500)

            yearly_data['total_kendaraan'] += total_vehicles
            yearly_data['total_tidak_bayar_5_thn'] += random.randint(5000, 10000) * vehicle_weights[i]
            yearly_data['total_tidak_bayar_7_thn'] += random.randint(2000, 7000) * vehicle_weights[i]
            yearly_data['total_bayar_thn_berjalan'] += bayar_1_thn
            yearly_data['total_kendaraan_baru'] += new_vehicles
            yearly_data['total_tidak_bayar_5_thn_rupiah'] += yearly_data['total_tidak_bayar_5_thn'] * random.randint(100, 500)
            yearly_data['total_tidak_bayar_7_thn_rupiah'] += yearly_data['total_tidak_bayar_7_thn'] * random.randint(100, 500)
            yearly_data['total_tidak_bayar_1_thn_rupiah'] += tidak_bayar_1_thn * random.randint(100, 500)

        yearly_data['bayar_online'] = random.randint(2000, 10000)
        yearly_data['bayar_offline'] = yearly_data['total_bayar_thn_berjalan'] - yearly_data['bayar_online']
        yearly_data['bayar_online_rupiah'] = yearly_data['bayar_online'] * random.randint(100, 500)
        yearly_data['bayar_offline_rupiah'] = yearly_data['bayar_offline'] * random.randint(100, 500)

        data.append(yearly_data)

    return data

# Insert data into the table
data = generate_random_data()
for entry in data:
    cursor.execute("""
        INSERT INTO pkbrekap (
            year, total_kendaraan, total_tidak_bayar_5_thn, total_tidak_bayar_7_thn, total_bayar_thn_berjalan,
            total_kendaraan_baru, total_tidak_bayar_5_thn_rupiah, total_tidak_bayar_7_thn_rupiah, total_tidak_bayar_1_thn_rupiah,
            bayar_online, bayar_offline, bayar_online_rupiah, bayar_offline_rupiah,
            jumlah_tipe_A, jumlah_tipe_B, jumlah_tipe_C, jumlah_tipe_D, jumlah_tipe_E, jumlah_tipe_F,
            baru_tipe_A, baru_tipe_B, baru_tipe_C, baru_tipe_D, baru_tipe_E, baru_tipe_F,
            bayar_1_thn_tipe_A, bayar_1_thn_tipe_B, bayar_1_thn_tipe_C, bayar_1_thn_tipe_D, bayar_1_thn_tipe_E, bayar_1_thn_tipe_F,
            bayar_2_thn_tipe_A, bayar_2_thn_tipe_B, bayar_2_thn_tipe_C, bayar_2_thn_tipe_D, bayar_2_thn_tipe_E, bayar_2_thn_tipe_F,
            bayar_3_thn_tipe_A, bayar_3_thn_tipe_B, bayar_3_thn_tipe_C, bayar_3_thn_tipe_D, bayar_3_thn_tipe_E, bayar_3_thn_tipe_F,
            bayar_1_thn_tipe_A_rupiah, bayar_1_thn_tipe_B_rupiah, bayar_1_thn_tipe_C_rupiah, bayar_1_thn_tipe_D_rupiah, bayar_1_thn_tipe_E_rupiah, bayar_1_thn_tipe_F_rupiah,
            bayar_2_thn_tipe_A_rupiah, bayar_2_thn_tipe_B_rupiah, bayar_2_thn_tipe_C_rupiah, bayar_2_thn_tipe_D_rupiah, bayar_2_thn_tipe_E_rupiah, bayar_2_thn_tipe_F_rupiah,
            bayar_3_thn_tipe_A_rupiah, bayar_3_thn_tipe_B_rupiah, bayar_3_thn_tipe_C_rupiah, bayar_3_thn_tipe_D_rupiah, bayar_3_thn_tipe_E_rupiah, bayar_3_thn_tipe_F_rupiah,
            tidak_bayar_1_thn_tipe_A, tidak_bayar_1_thn_tipe_B, tidak_bayar_1_thn_tipe_C, tidak_bayar_1_thn_tipe_D, tidak_bayar_1_thn_tipe_E, tidak_bayar_1_thn_tipe_F,
            tidak_bayar_2_thn_tipe_A, tidak_bayar_2_thn_tipe_B, tidak_bayar_2_thn_tipe_C, tidak_bayar_2_thn_tipe_D, tidak_bayar_2_thn_tipe_E, tidak_bayar_2_thn_tipe_F,
            tidak_bayar_3_thn_tipe_A, tidak_bayar_3_thn_tipe_B, tidak_bayar_3_thn_tipe_C, tidak_bayar_3_thn_tipe_D, tidak_bayar_3_thn_tipe_E, tidak_bayar_3_thn_tipe_F,
            tidak_bayar_1_thn_tipe_A_rupiah, tidak_bayar_1_thn_tipe_B_rupiah, tidak_bayar_1_thn_tipe_C_rupiah, tidak_bayar_1_thn_tipe_D_rupiah, tidak_bayar_1_thn_tipe_E_rupiah, tidak_bayar_1_thn_tipe_F_rupiah,
            tidak_bayar_2_thn_tipe_A_rupiah, tidak_bayar_2_thn_tipe_B_rupiah, tidak_bayar_2_thn_tipe_C_rupiah, tidak_bayar_2_thn_tipe_D_rupiah, tidak_bayar_2_thn_tipe_E_rupiah, tidak_bayar_2_thn_tipe_F_rupiah,
            tidak_bayar_3_thn_tipe_A_rupiah, tidak_bayar_3_thn_tipe_B_rupiah, tidak_bayar_3_thn_tipe_C_rupiah, tidak_bayar_3_thn_tipe_D_rupiah, tidak_bayar_3_thn_tipe_E_rupiah, tidak_bayar_3_thn_tipe_F_rupiah
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """, tuple(entry.values()))

conn.commit()
cursor.close()
conn.close()

