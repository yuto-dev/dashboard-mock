string = "year, total_kendaraan, total_tidak_bayar_5_thn, total_tidak_bayar_7_thn, total_bayar_thn_berjalan, total_kendaraan_baru, total_tidak_bayar_5_thn_rupiah, total_tidak_bayar_7_thn_rupiah, total_tidak_bayar_1_thn_rupiah,bayar_online, bayar_offline, bayar_online_rupiah, bayar_offline_rupiah,jumlah_tipe_A, jumlah_tipe_B, jumlah_tipe_C, jumlah_tipe_D, jumlah_tipe_E, jumlah_tipe_F,baru_tipe_A, baru_tipe_B, baru_tipe_C, baru_tipe_D, baru_tipe_E, baru_tipe_F,bayar_1_thn_tipe_A, bayar_1_thn_tipe_B, bayar_1_thn_tipe_C, bayar_1_thn_tipe_D, bayar_1_thn_tipe_E, bayar_1_thn_tipe_F,bayar_2_thn_tipe_A, bayar_2_thn_tipe_B, bayar_2_thn_tipe_C, bayar_2_thn_tipe_D, bayar_2_thn_tipe_E, bayar_2_thn_tipe_F,bayar_3_thn_tipe_A, bayar_3_thn_tipe_B, bayar_3_thn_tipe_C, bayar_3_thn_tipe_D, bayar_3_thn_tipe_E, bayar_3_thn_tipe_F,bayar_1_thn_tipe_A_rupiah, bayar_1_thn_tipe_B_rupiah, bayar_1_thn_tipe_C_rupiah, bayar_1_thn_tipe_D_rupiah, bayar_1_thn_tipe_E_rupiah, bayar_1_thn_tipe_F_rupiah,bayar_2_thn_tipe_A_rupiah, bayar_2_thn_tipe_B_rupiah, bayar_2_thn_tipe_C_rupiah, bayar_2_thn_tipe_D_rupiah, bayar_2_thn_tipe_E_rupiah, bayar_2_thn_tipe_F_rupiah,bayar_3_thn_tipe_A_rupiah, bayar_3_thn_tipe_B_rupiah, bayar_3_thn_tipe_C_rupiah, bayar_3_thn_tipe_D_rupiah, bayar_3_thn_tipe_E_rupiah, bayar_3_thn_tipe_F_rupiah,tidak_bayar_1_thn_tipe_A, tidak_bayar_1_thn_tipe_B, tidak_bayar_1_thn_tipe_C, tidak_bayar_1_thn_tipe_D, tidak_bayar_1_thn_tipe_E, tidak_bayar_1_thn_tipe_F,tidak_bayar_2_thn_tipe_A, tidak_bayar_2_thn_tipe_B, tidak_bayar_2_thn_tipe_C, tidak_bayar_2_thn_tipe_D, tidak_bayar_2_thn_tipe_E, tidak_bayar_2_thn_tipe_F,tidak_bayar_3_thn_tipe_A, tidak_bayar_3_thn_tipe_B, tidak_bayar_3_thn_tipe_C, tidak_bayar_3_thn_tipe_D, tidak_bayar_3_thn_tipe_E, tidak_bayar_3_thn_tipe_F,tidak_bayar_1_thn_tipe_A_rupiah, tidak_bayar_1_thn_tipe_B_rupiah, tidak_bayar_1_thn_tipe_C_rupiah, tidak_bayar_1_thn_tipe_D_rupiah, tidak_bayar_1_thn_tipe_E_rupiah, tidak_bayar_1_thn_tipe_F_rupiah,tidak_bayar_2_thn_tipe_A_rupiah, tidak_bayar_2_thn_tipe_B_rupiah, tidak_bayar_2_thn_tipe_C_rupiah, tidak_bayar_2_thn_tipe_D_rupiah, tidak_bayar_2_thn_tipe_E_rupiah, tidak_bayar_2_thn_tipe_F_rupiah,tidak_bayar_3_thn_tipe_A_rupiah, tidak_bayar_3_thn_tipe_B_rupiah, tidak_bayar_3_thn_tipe_C_rupiah, tidak_bayar_3_thn_tipe_D_rupiah, tidak_bayar_3_thn_tipe_E_rupiah, tidak_bayar_3_thn_tipe_F_rupiah"
def count_commas(input_string):
    """
    Counts the number of commas in the given string.

    Parameters:
    input_string (str): The string in which to count commas.

    Returns:
    int: The number of commas in the string.
    """
    return input_string.count(',')

comma_count = count_commas(string)
print(f"The number of commas in the string is: {comma_count}")