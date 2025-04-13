package com.example.backend;

import com.example.backend.database.DatabaseManager;
import com.example.backend.model.ObjectType;
import com.example.backend.service.ObjectService;
import com.example.backend.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

import java.util.HashMap;

@AllArgsConstructor
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class BackendApplication implements CommandLineRunner {

    private DatabaseManager databaseManager;
    private ObjectService objectService;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String[] args) throws Exception {
//        test();
        initWashers();

    }

    private void initWashers() {
        if (objectService.getAllByType(ObjectType.WASHER).isEmpty()) {
            for (int i = 1; i <= 15; i++) {
                String name = i % 2 == 0 ? "pralka" : "suszarka";
                ObjectType objectType = i % 2 == 0 ? ObjectType.WASHER : ObjectType.DRYER;
                for (int j = 1; j <= 3; j++) {
                    String washerId = name + "-" + j + "-" + i;
                    objectService.createObject(washerId, objectType);
                }
            }
            System.out.println("Created all pralkas");
        }
    }

    private void test() throws Exception {
        String name = databaseManager.getDocumentData("Users", "46e11608-a5e1-414b-8333-3e2d245677ff", "name");
        System.out.println(name);

        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("name", "Jan");
        hashMap.put("surname", "Masternak");
        databaseManager.createDocumentWithData(
                "Users",
                "asdasd",
                hashMap
        );
    }

}
