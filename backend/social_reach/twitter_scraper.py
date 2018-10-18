from random import choice
import json

import requests
from bs4 import BeautifulSoup

_user_agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36'
]


class TwitterScraper:

    def __init__(self, user_agents=_user_agents, proxy=None):
        self.user_agents = user_agents
        self.proxy = proxy

    # def __random_agent(self):
    #     if self.user_agents and isinstance(self.user_agents, list):
    #         return choice(self.user_agents)
    #     return choice(_user_agents)
    #
    # def __request_url(self, url):
    #     try:
    #         self.__random_agent()
    #         response = requests.get(url, headers={'User-Agent': self.__random_agent()}, proxies={'http': self.proxy,
    #                                                                                              'https': self.proxy})
    #         response.raise_for_status()
    #     except requests.HTTPError:
    #         raise requests.HTTPError(
    #             'Received non 200 status code from Twitter')
    #     except requests.RequestException:
    #         raise requests.RequestException
    #     else:
    #         return response.text
    #
    # @staticmethod
    # def extract_json_data(html):
    #     soup = BeautifulSoup(html, 'html.parser')
    #     body = soup.find('body')
        # script_tag = body.find('script')
        # raw_string = script_tag.text.strip().replace(
        #     'window._sharedData =', '').replace(';', '')
        # return json.loads(raw_string)


    def scrape_twitter_followers(self, twitter_handle):
        url = 'https://www.twitter.com/' + twitter_handle
        r = requests.get(url)
        soup = BeautifulSoup(r.content)
        f = soup.find('li', class_="ProfileNav-item--followers")
        if f is not None:
            title = f.find('a')['title']
            print(title)
            num_followers = int(title.split(' ')[0].replace(',', ''))
            print(num_followers)
        else:
            num_followers = 0

        return num_followers
