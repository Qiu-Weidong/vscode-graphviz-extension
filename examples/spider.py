# 爬取 graphviz 的 gallery



'''
爬取所有的 url
# from bs4 import BeautifulSoup
# import requests

respone = requests.get('https://graphviz.org/gallery/')

soup = BeautifulSoup(respone.text, 'lxml')

body = soup.body
blocks = body.select('.container-fluid .td-main .flex-xl-nowrap .td-sidebar .td-sidebar__inner')[0].nav.ul.li.ul.find_all('li')

print('[', end='')
for block in blocks:
  # 使用 text 同时获取子节点内容
  print('"' + block.a.attrs['href'] + '"', end=', ')
print(']')
'''

# 下载文件
'''
from urllib.request import urlretrieve
import os.path


urls = ["/Gallery/directed/", "/Gallery/directed/git.html", "/Gallery/directed/bazel.html", "/Gallery/directed/cluster.html", "/Gallery/directed/datastruct.html", "/Gallery/directed/kennedyanc.html", "/Gallery/directed/fsm.html", "/Gallery/directed/go-package.html", "/Gallery/directed/hello.html", "/Gallery/directed/Linux_kernel_diagram.html", "/Gallery/directed/Genetic_Programming.html", "/Gallery/directed/neural-network.html", "/Gallery/directed/ninja.html", "/Gallery/directed/psg.html", "/Gallery/directed/crazy.html", "/Gallery/directed/pprof.html", "/Gallery/directed/profile.html", "/Gallery/directed/lion_share.html", "/Gallery/directed/siblings.html", "/Gallery/directed/switch.html", "/Gallery/directed/sdh.html", "/Gallery/directed/UML_Class_diagram.html", "/Gallery/directed/unix.html", "/Gallery/directed/world.html", "/Gallery/neato/", "/Gallery/neato/color_wheel.html", "/Gallery/neato/ER.html", "/Gallery/neato/softmaint.html", "/Gallery/neato/transparency.html", "/Gallery/neato/philo.html", "/Gallery/neato/process.html", "/Gallery/neato/traffic_lights.html", "/Gallery/neato/colors.html", "/Gallery/undirected/", "/Gallery/undirected/gd_1994_2007.html", "/Gallery/undirected/grid.html", "/Gallery/undirected/save/", "/Gallery/undirected/save/inet.html", "/Gallery/undirected/fdpclust.html", "/Gallery/undirected/root.html", "/Gallery/twopi/", "/Gallery/twopi/twopi2.html", "/Gallery/twopi/happiness.html", "/Gallery/twopi/networkmap_twopi.html", "/Gallery/gradient/", "/Gallery/gradient/cluster.html", "/Gallery/gradient/linear_angle.html", "/Gallery/gradient/radial_angle.html", "/Gallery/gradient/datastruct.html", "/Gallery/gradient/g_c_n.html", "/Gallery/gradient/angles.html", "/Gallery/gradient/colors.html", "/Gallery/gradient/table.html", ]
baseUrl = 'https://graphviz.org'

for url in urls:
  if not url.endswith('html'):
    continue
  filename = os.path.basename(url).replace('.html', '.dot')
  if not os.path.exists(filename):
    print(url, filename)
    url = url.replace('.html', '.gv.txt')
    try:
      urlretrieve(baseUrl+url, filename)
    except:
      print('下载文件失败', url)

print('done')
'''

