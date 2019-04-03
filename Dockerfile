FROM openjdk:8
ADD target/vinnsl-service-0.0.1-SNAPSHOT.jar vinnsl-service-0.0.1-SNAPSHOT.jar
EXPOSE 8088
ENTRYPOINT ["java", "-jar", "vinnsl-service-0.0.1-SNAPSHOT.jar"]
