package procuidado.holamundo;
 
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
 
@Controller
public class CIHolaMundo {
 
    @RequestMapping("/HolaMundo")
    public ModelAndView helloWorld() {
 
        String message = "Uolaaaaa!";
        return new ModelAndView("HolaMundo", "message", message);
    }
}