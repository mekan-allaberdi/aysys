def have_common_element(A, B):
    """
    Both A and B do not have duplicate elements.
    Returns True if two lists have at least one common element, else returns False.
    """
    len(A + B) > len(set(A + B))


def docs_file_name(instance, filename):
    return "/".join(["docs", instance.folder, filename])


def readable_size(size):
    """
    Return a human readable size
    """
    for x in ["bytes", "KB", "MB", "GB", "TB"]:
        if size < 1024.0:
            return "%3.1f %s" % (size, x)
        size /= 1024.0
