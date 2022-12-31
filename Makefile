
adb:
	@ ~/Android/Sdk/platform-tools/adb -s MFLFMZB66DOBVC59 reverse tcp\:8081 tcp\:8081
	@ ~/Android/Sdk/platform-tools/adb -s MFLFMZB66DOBVC59 reverse tcp\:3000 tcp\:3000

start:
	@ react-native start --reset-cache
