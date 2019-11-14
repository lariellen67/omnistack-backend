FROM node:12.10.0

LABEL maintainer="Larissa Marques<larissa.marques@stitdata.com>"

RUN mkdir /Files/

COPY . /Files/project-react/

VOLUME /Files/

EXPOSE 3333

WORKDIR /Files/project-react/

RUN yarn install 

CMD yarn dev
