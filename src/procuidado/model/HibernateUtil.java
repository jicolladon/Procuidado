package procuidado.model;

import org.hibernate.SessionFactory;  
import org.hibernate.cfg.Configuration;  
  
@SuppressWarnings("deprecation")
public class HibernateUtil {  
      
    private static SessionFactory sessionFactory;  
      
    static{  
        try {
        	//Configuration cfg = new Configuration().addResource("hibernate.reveng.xml")
            sessionFactory = new Configuration().addResource("hibernate.reveng.xml").configure().buildSessionFactory();  
        } catch (Throwable e) {  
            throw new ExceptionInInitializerError(e);  
        }  
    }  
  
    public static SessionFactory getSessionFactory(){  
        return sessionFactory;  
    }  
      
    public static void shutDown(){  
        //closes caches and connections  
        getSessionFactory().close();  
    }  
} 

