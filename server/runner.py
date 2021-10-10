import pandas as pd
def run(df):
	# Здесь можете ввести нужные преобразования
	df['Year'] = df['Date'].apply(lambda r: r.split('-')[0])

	return df['Year']