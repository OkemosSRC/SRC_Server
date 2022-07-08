import sqlite3
from datetime import datetime
import matplotlib.dates as mdates
import matplotlib.pyplot as plt

conn = sqlite3.connect('db/battery.db')

c = conn.cursor()
c.execute("SELECT `battery_time`,`battery_temp`,`battery_voltage` FROM battery")
srs_bat = c.fetchall()
conn.close()

# Temp data
time_sample = []
temp_sample = []
voltage_sample = []

time = [x[0] for x in srs_bat]
temp = [x[1] for x in srs_bat]
voltage = [x[2] for x in srs_bat]
for i in range(len(time)):
    if i % 30 == 0:
        time_sample.append(datetime.fromtimestamp(round(int(time[i]) / 1000)))
        temp_sample.append(float(temp[i]))
        voltage_sample.append(float(voltage[i]))

fig = plt.figure()
# Figure size
fig.set_size_inches(25, 8)
ax = fig.add_subplot(2, 1, 1)
ax.grid(True)

ab = fig.add_subplot(2, 1, 2)
ax.plot(time_sample, temp_sample, "b-", label="Temperature")
ax.xaxis.set_major_locator(mdates.MinuteLocator(interval=15))  # to get a tick every 15 minutes
ax.xaxis.set_major_formatter(mdates.DateFormatter('%H:%M'))
ax.set_xlabel('Time')
ax.set_ylabel('Temperature (°C)', labelpad=10)
ax.set_title('Battery Temperature', pad=10)
ab.plot(time_sample, voltage_sample, "r-", label="Voltage")
ab.set_title('Battery Voltage', pad=10)
ab.set_xlabel('Time')
ab.set_ylabel('Voltage (V)', labelpad=10)
ab.grid(True)
plt.tight_layout()
# plt.show()
plt.savefig('public/images/battery_graph.png')
print("Battery graph created")
plt.close()
