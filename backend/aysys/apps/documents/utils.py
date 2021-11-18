def have_common_element(A, B):
    """
    Both A and B do not have duplicate elements.
    Returns True if two lists have at least one common element, else returns False.
    """
    len(A + B) > len(set(A + B))


def docs_file_name(instance, filename):
    return "/".join(["docs", instance.directory, filename])
