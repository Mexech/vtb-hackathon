import pandas as pd
def run(df):
	# ����� ������ ������ ������ ��������������
	df['Year'] = df['Date'].apply(lambda r: r.split('-')[0])

	return df['Year']