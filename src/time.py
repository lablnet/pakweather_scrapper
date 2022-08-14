"""time.py Get the time."""
__author__ = "Muhammad Umer Farooq"
__license__ = "MIT"
__version__ = "1.0.1"
__maintainer__ = "Muhammad Umer Farooq"
__email__ = "umer@lablnet.com"
__status__ = "Production"


import datetime
print(datetime.datetime.now(
    tz=datetime.timezone(datetime.timedelta(hours=5)))
)
