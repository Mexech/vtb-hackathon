import pandas as pd
def run(df):
	# Здесь можете ввести нужные преобразования
	df['asf'] = df['Date']
	return df['asf']