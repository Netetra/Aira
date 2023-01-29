FROM ubuntu:22.10

#shをBashに変更
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get -y update && apt-get -y upgrade
RUN apt-get -y install sudo nodejs npm

#ユーザー作成
ARG user_name=ubuntu
ARG user_id=1942
ARG group_name=ubuntu
ARG group_id=1942

RUN groupadd -g ${group_id} ${group_name} && \
    useradd -u ${user_id} -g ${group_id} -d /home/${user_name} --create-home --shell /bin/bash ${user_name}
RUN echo "${user_name} ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers && chown -R ${user_name}:${group_name} /home/${user_name}

USER ${user_name}
WORKDIR /Aira
