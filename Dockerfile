FROM node

WORKDIR /usr/src/app

COPY my-app-1.2.0.tgz .

RUN tar -xzf my-app-1.2.0.tgz && \
    mv package/* ./ && \
    rm -rf package && \
    npm install


# Run tests
RUN npm test
    
EXPOSE 3000

CMD ["npm", "start"]
