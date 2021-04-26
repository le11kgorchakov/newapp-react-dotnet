FROM mcr.microsoft.com/mssql/server:2019-latest

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=

EXPOSE 1433

COPY ./restore-database.sql .
COPY ./restore-database.sh .

CMD /bin/bash restore-database.sh

