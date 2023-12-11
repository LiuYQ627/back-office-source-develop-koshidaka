ARG JAVA_IMAGE=adoptopenjdk:11-hotspot-bionic
FROM $JAVA_IMAGE

ENV LOGGING_FILE -Dlogging.file.name=/dev/null

VOLUME /tmp
COPY build/libs/prementenance-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT java $JAVA_OPTS $LOGGING_FILE -jar /app.jar