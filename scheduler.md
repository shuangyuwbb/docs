# BlockingScheduler
BlockingScheduler是APScheduler库中的一种调度器，用于创建和管理定时任务。它会阻塞当前进程直到所有工作完成。

## 作用
用于触发和执行预定的作业或函数。
可以用于定时执行特定的任务，例如定时备份、数据清理等。
用法
python
from apscheduler.schedulers.blocking import BlockingScheduler

def my_job():
    print('Job is running...')

scheduler = BlockingScheduler()
scheduler.add_job(my_job, 'interval', seconds=10)
scheduler.start()
上述代码会每隔10秒执行一次my_job函数，并且会一直运行直到手动停止。

## 参数
jobstores: 指定作业存储。
executors: 指定执行器。
job_defaults: 指定作业的默认值。
timezone: 指定时区。
daemonize: 指定是否将调度程序设置为守护程序模式。
BlockingScheduler允许你使用不同的参数来对调度器进行配置，以满足各种定时任务的需求。

scheduler.add_job()方法用于向调度器中添加作业。以下是该方法的常用参数及其代表的含义：

func: 要执行的函数或作业。
trigger: 触发器，用于指定作业的触发方式。
args: 传递给作业函数的位置参数（元组形式）。
kwargs: 传递给作业函数的关键字参数（字典形式）。
id: 作业的标识符，可以用于后续的操作。
name: 作业的名称，便于识别和管理。
misfire_grace_time: 允许的错过执行时间，单位为秒。
coalesce: 是否合并相同作业的连续执行请求。
max_instances: 允许同时运行的作业实例数量。
next_run_time: 指定作业的下一次运行时间。
使用这些参数，你可以灵活地配置作业的执行方式，包括触发条件、参数传递等，以满足各种任务的需求。

## 在APScheduler中，触发器用于指定作业的触发方式，常见的触发器包括以下几种：

date: 在特定日期和时间触发作业。

interval: 间隔性触发作业，可以设定间隔的秒数、分钟数、小时数等。

cron: 使用类似于UNIX cron表达式的方式来指定作业的触发时间。

combining: 允许将多个触发器组合在一起，使用逻辑操作符（And、Or等）。

这些触发器允许你根据需要灵活地指定作业的触发时间，例如可以基于时间间隔、具体日期、特定的时间点等条件来触发作业，以满足各种任务调度的需求。