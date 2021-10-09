import json
import pandas as pd
def run(queue):
    data = queue.get()
    print(data)
    month_Year = data['Month_Year']
    queue.put(month_Year)
