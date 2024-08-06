
import { InventaryRepository } from 'services/services/repositories/inventary.repository';
import { useRepositoryIoc } from '../services/services/config/context';
import { TYPES } from '../services/services/config/types';

const useInventaryRepository = (): InventaryRepository => {
  const { container } = useRepositoryIoc();

  return container.get(TYPES.INVENTARY_REPOSITORY);
};

export default useInventaryRepository;
