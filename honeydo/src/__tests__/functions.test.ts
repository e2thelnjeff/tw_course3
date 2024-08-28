import { addNewItem } from '../components/functions';

test('testing addNewItem', async () => {
    const result = await addNewItem('balls');
    expect(result[result.length-1].text).toContain('balls');
    
})

