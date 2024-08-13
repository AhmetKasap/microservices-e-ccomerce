package com.microservices.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import lombok.Value;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.IOException;
import java.util.UUID;

@Service
@Log4j2
public class S3Service {
    private final AmazonS3 s3client;


    private final String bucketName ="my-aws-product-bucket";

    public S3Service(AmazonS3 s3client) {
        this.s3client = s3client;
    }


    public void uploadFile(String keyName, MultipartFile file) throws IOException {
        //String uniqueFileName = UUID.randomUUID().toString() + "_" + keyName;
        var putObjectResult = s3client.putObject(bucketName, keyName, file.getInputStream(), null);
        log.info(putObjectResult.getMetadata());
    }

    public String getFileUrl(String keyName) {
        return s3client.getUrl(bucketName, keyName).toString();
    }



    public void updateFile(String keyName, MultipartFile newFile) throws IOException {
        var result = deleteFile(keyName);
        if(result == true) {
            uploadFile(keyName, newFile);
        }
    }

    public boolean deleteFile(String keyName) {
        try {
            s3client.deleteObject(bucketName, keyName);
            return true;
        } catch (Exception e) {
            return false;
        }
    }




}
