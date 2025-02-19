import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogService from '../services/blogService';
import CreateNewDialog from './CreateNew';


test("CreateNew calls callback with right info", async () => {
    const user = userEvent.setup();
    const pc = vi.fn().mockImplementation(() => Promise.resolve({}));
    const bsService = new BlogService({token: "testitokeni"}, () => null, pc);

    const {container} = render(<CreateNewDialog showNotification={() => null} update={() => null} bs={bsService}/>);
    const showButton = screen.getByText("Create new");
    await user.click(showButton);
    const titleField = container.querySelector(".title-input");
    const authorField = container.querySelector(".author-input");
    const urlField = container.querySelector(".url-input");
    
    await user.type(titleField, "testititle");
    await user.type(authorField, "testiteppo");
    await user.type(urlField, "testiurli");

    const submit = screen.getByText("Create");
    await user.click(submit);
    

    expect(pc).toHaveBeenCalledWith({
        title: "testititle",
        author: "testiteppo",
        url: "testiurli"
    })
})

