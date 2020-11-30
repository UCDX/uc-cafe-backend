#!/bin/bash

if [[ $# -lt 1 ]]
then
  echo "Usage: createdb.sh [db-user] [OPTIONS: --reset=db-name]"
  exit
fi

if [[ $2 ]]
then
  dbname=$(echo $2 | cut -d = -f 2)
  echo "Dropping DB=$dbname, if exists. Enter the password for your MariaDB user."
  echo "drop database if exists $dbname" | mariadb -u $1 -p
  if [[ $? -eq 0 ]]
  then
    echo "DB dropped, if existed."
  else
    echo "DB couldn't be dropped. Exiting."
    exit
  fi
fi

#Cuenta la cantidad de / que hay.
num=$(echo $0 | grep / -o | wc -l)
#Extrae el nombre de este archivo.
filename=$(echo $0 | cut -d / -f $((num + 1)))
#Reemplaza el nombre de este archivo con el de el script sql.
dbfilenmae=$(echo $0 | sed s/$filename/db.sql/g)
#Carga entuba el script a mariadb para crear la DB.
echo "Creating BD. Enter the password for your MariaDB user."
cat $dbfilenmae | mariadb -u $1 -p
if [[ $? -ne 0 ]]
then
  echo "Something went wrong while trying to create the DB."
else
  echo "DB created."
fi
