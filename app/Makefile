ADB_DIR = ~/Android/Sdk/platform-tools/adb
DEVICE = MFLFMZB66DOBVC59

adb:
	@ ${ADB_DIR} -s ${DEVICE} reverse tcp\:8081 tcp\:8081
	@ ${ADB_DIR} -s ${DEVICE} reverse tcp\:3000 tcp\:3000

start:
	@ react-native start --reset-cache
