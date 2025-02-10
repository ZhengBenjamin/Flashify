from abc import abstractmethod


class Usergroup:
    @abstractmethod
    def credentials(self):
        pass