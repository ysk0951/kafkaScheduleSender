#!/bin/sh


##########################################################################
# * DFINDER MARIA DB RUN SCRIPT
# * FILE : run.sh
# * AUTHOR : yhsong
# * Copyright (C) Interezen Co.,Ltd. - All Rights Reserved
##########################################################################

MODULE_NAME="DFINDER_MARIA_DB"
###########################################
# FIND PATH
###########################################
LOCATION=$(cd "$(dirname "$0")"/.. && pwd)
###########################################


###########################################
# ENV : USER MODIFIED SETTING
###########################################
USER="interezen"
ROOT_PASSWORD=""
PORT="23306"
DATA_DIR="${LOCATION}/data"
LOG_DIR="${LOCATION}/logs"
LOG_FILE="${LOG_DIR}/dfinder.log"
#------------------------------------------
CNF_FILE="${LOCATION}/conf/my.cnf"
PID_PATH="${LOCATION}/pid"
PID_FILE="${LOCATION}/pid/dfinder_mariadb_${PORT}.pid"
SOCK_FILE="${LOCATION}/bin/mysql.sock"
###########################################
USER_TMP=$2
USER_PW_TMP=$3

if ! test -d ${LOG_DIR} ; then
    mkdir ${LOG_DIR}
fi
if ! test -d ${PID_PATH} ; then
    mkdir ${PID_PATH}
fi
###########################################
# PROC GREP PATTERN
###########################################
find_process () {
    PID_TEMP=`ps -ef | grep "/bin/mysqld" | grep "${LOCATION}" | grep -v grep | awk '{ print $2 }'`
    if [ "x${PID_TEMP}" = "x" ]; then
        PID=-1
    else
        PID=${PID_TEMP}
    fi
}


###########################################
# PROC COUNT
###########################################
find_process_count () {
    PROC_COUNT=`ps -ef | grep "/bin/mysqld" | grep "${LOCATION}" | grep -v grep | wc -l`
}


###########################################
# START METHOD
###########################################
start () {
    print_start
    find_process_count
    if [ ${PROC_COUNT} -gt 0 ]; then
      find_process
      echo " * [$(date +"%F_%H:%M:%S")] : ${MODULE_NAME} IS RUNNING STATE...  PID: ${PID}"
      print_end
    fi

    echo " * [$(date +"%F_%H:%M:%S")] : START PROCESS CALL."
    cd "${LOCATION}/bin/"
    nohup ./mysqld_safe --defaults-file=${CNF_FILE} --basedir=${LOCATION} --datadir=${DATA_DIR} --port=${PORT} --pid-file=${PID_FILE} --user=${USER} --socket=${SOCK_FILE} --log-error=${LOG_FILE} >> std.out 2>&1 &

    x=1
    while [ ${x} -lt 10 ]
    do
       find_process_count
       if [ ${PROC_COUNT} -gt 0 ]; then
         x=100
         find_process
         echo " * [$(date +"%F_%H:%M:%S")] : ${MODULE_NAME} IS STARTED... : ${PID}"
         echo " * [$(date +"%F_%H:%M:%S")] : PLEASE READ THE LOG FILE"
         echo " * [$(date +"%F_%H:%M:%S")] : TASK RESULT => SUCCESS"
         print_end
       fi
       x=$((x+1))
       sleep 1
    done

    echo " * [$(date +"%F_%H:%M:%S")] : ${MODULE_NAME} IS NOT STARTED OR ERROR."
    print_end
}


###########################################
# END METHOD
###########################################
stop () {

    print_start
    find_process_count
    echo " * [$(date +"%F_%H:%M:%S")] : ${MODULE_NAME} PROCESS COUNT : ${PROC_COUNT}"
    if [ ${PROC_COUNT} -lt 1 ]; then
      echo " * [$(date +"%F_%H:%M:%S")] : ${MODULE_NAME} IS NOT LOADED. THERE IS NO SENSE IN STOP."
      print_end
    fi

    find_process
    echo " * [$(date +"%F_%H:%M:%S")] : ${MODULE_NAME} RUNNING PROCESS PID : ${PID}"
    cd "${LOCATION}/bin/"
    ./mysqladmin -uroot --password="${ROOT_PASSWORD}" --socket="${SOCK_FILE}" shutdown
    echo " * [$(date +"%F_%H:%M:%S")] : TASK RESULT => CONFIRM(STOP WAIT TO LONG OR NO STOP)"
    print_end
}


connect() {
  if [ -z "${USER_TMP}" ]; then
    ./mysql -uroot -p --socket="${SOCK_FILE}"
  else
    ./mysql -u"${USER_TMP}" --password="${USER_PW_TMP}" --socket="${SOCK_FILE}"
  fi
}


print_start () {
    echo ""
    echo " ============================================"
    echo " | ${MODULE_NAME} SCRIPT START"
    echo " ============================================"
    echo ""
}

print_end () {
    echo ""
    echo " ============================================"
    echo " | ${MODULE_NAME} SCRIPT END! BYE-BYE. SeeYa."
    echo " ============================================"
    echo ""
    exit 0
}



###########################################
# END METHOD
###########################################

case $1 in
start)
        start
        ;;
stop)
        stop
        exit 0
        ;;
connect)
        connect
        exit 0
        ;;
restart)
        stop
        sleep 2
        start
        ;;
*)
        echo $"Usage: $0 {start|stop|restart|connect}"
        RETVAL=1
esac
exit 0
