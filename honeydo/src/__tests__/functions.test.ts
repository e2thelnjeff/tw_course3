import { addNewItem } from '../components/functions';

test('testing addNewItem', async () => {
    const result = await addNewItem('give thanks');
    expect(result[result.length-1].text).toContain('give thanks');
    
})

